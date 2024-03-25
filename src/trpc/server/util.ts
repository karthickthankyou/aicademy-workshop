import { Role } from '@/util/types'
import { prisma } from '@/db'
import { TRPCError } from '@trpc/server'

export const getUserRoles = async (id: string): Promise<Role[]> => {
  const [adminExists, studentExits] = await Promise.all([
    prisma.admin.findUnique({ where: { id } }),
    prisma.student.findUnique({ where: { id } }),
  ])

  const roles: Role[] = []

  if (adminExists) roles.push('admin')
  if (studentExits) roles.push('student')

  return roles
}

export const authorizeUser = async (
  uid: string,
  roles: Role[],
): Promise<void> => {
  if (!roles || roles.length === 0) {
    return // No specific roles required, access is granted
  }

  const userRoles = await getUserRoles(uid)

  if (!userRoles.some((role) => roles.includes(role))) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'User does not have the required role(s).',
    })
  }
}
