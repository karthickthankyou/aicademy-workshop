'use client'
import {
  FormProviderCreateCourse,
  FormTypeCreateCourse,
  useFormContextCreateCourse,
} from '@/forms/createCourse'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { Label } from '../atoms/label'
import { Input } from '../atoms/input'
import { TextArea } from '../atoms/textArea'
import { Switch } from '../atoms/switch'
import { ImagePreview } from '../molecules/ImagePreview'
import { Title3 } from '../atoms/typography'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../atoms/accordion'
import { Button } from '../atoms/button'
import { Plus } from 'lucide-react'
import { useCloudinaryUpload } from '@/util/hooks'
import { trpcClient } from '@/trpc/clients/client'
import { useToast } from '../molecules/Toaster/use-toast'
import { useRouter } from 'next/navigation'
import { revalidatePath } from '@/util/actions'
import { JsonFileInput } from '../organisms/JsonFileInput'
import { formSchemaCreateCourse } from '@/forms/schemas'

export const CreateCourse = () => {
  return (
    <FormProviderCreateCourse>
      <CreateCourseContent />
    </FormProviderCreateCourse>
  )
}

export const CreateCourseContent = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    resetField,
    formState: { errors },
  } = useFormContextCreateCourse()

  const { loading, upload } = useCloudinaryUpload()
  const { toast } = useToast()
  const router = useRouter()

  const {
    mutateAsync: createCourse,
    error,
    data,
    isLoading,
  } = trpcClient.courses.create.useMutation({
    onSuccess(data, variables, context) {
      revalidatePath('/admin/manageCourses')
      toast({ title: `Course: ${data.title} created!🎉` })
      reset()
      router.replace('/admin/manageCourses')
    },
    onError(error, variables, context) {
      toast({ title: ` ${error.message}` })
    },
  })

  const { image } = watch()
  return (
    <div className="p-4 bg-white rounded">
      <form
        className="grid grid-cols-2 gap-3"
        onSubmit={handleSubmit(async (formData) => {
          const uploadedImage = await upload(formData.image?.[0])
          await createCourse({ ...formData, image: uploadedImage })
        })}
      >
        <div>
          <JsonFileInput
            reset={reset}
            schema={formSchemaCreateCourse}
            className="mb-4"
          />
          <Label title="Title" error={errors.title?.message}>
            <Input {...register('title')} placeholder="Title" />
          </Label>
          <Label title="Description" error={errors.description?.message}>
            <TextArea
              {...register('description')}
              placeholder="Description..."
            />
          </Label>
          <Label title="Published">
            <Controller
              control={control}
              name="published"
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </Label>
        </div>
        <div className="sticky top-12">
          <ImagePreview
            src={image}
            clearImage={() => {
              resetField('image')
            }}
          >
            <Controller
              control={control}
              name={`image`}
              render={({ field }) => (
                <Input
                  type="file"
                  accept="image/*"
                  multiple={false}
                  onChange={(e) => field.onChange(e?.target?.files)}
                />
              )}
            />
          </ImagePreview>
        </div>
        <div>
          <Title3>Chapters</Title3>
          <div className="px-4">
            <AddChapter />
          </div>
          <Button type="submit" className="mt-6" loading={loading || isLoading}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export const AddChapter = () => {
  const {
    control,
    register,
    formState: { errors },
    watch,
  } = useFormContextCreateCourse()

  const { fields, append, remove } = useFieldArray({
    control,
    name: `chapters`,
  })

  const { chapters } = watch()

  return (
    <div>
      {fields.map((item, chapterIndex) => (
        <Accordion type="single" key={item.id} collapsible defaultChecked>
          <AccordionItem value={item.id} defaultChecked>
            <AccordionTrigger>
              {chapters?.[chapterIndex]?.title || (
                <span className="italic text-gray-500">No Title</span>
              )}
            </AccordionTrigger>

            <AccordionContent>
              <div className={`flex justify-end my-2`}>
                <Button
                  variant={'ghost'}
                  className="text-xs text-gray-600 underline underline-offset-2"
                  onClick={() => {
                    remove(chapterIndex)
                  }}
                >
                  remove chapter
                </Button>
              </div>

              <div className={`flex flex-col`}>
                <Label
                  title="Title"
                  error={errors.chapters?.[chapterIndex]?.title?.toString()}
                >
                  <Input
                    placeholder="Title"
                    {...register(`chapters.${chapterIndex}.title`)}
                  />
                </Label>
                <Label
                  title="Content"
                  error={errors.chapters?.[chapterIndex]?.content?.message}
                >
                  <TextArea
                    placeholder="Content"
                    {...register(`chapters.${chapterIndex}.content`)}
                  />
                </Label>
              </div>
              <div className="px-4">
                <AddQuestion chapterIndex={chapterIndex} />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
      <div>
        <Button
          className="flex items-center justify-center w-full py-2 text-xs border border-dashed"
          variant={'outline'}
          onClick={() =>
            append({
              content: '',
              title: '',
              questions: [],
            })
          }
        >
          <Plus className="w-4 h-4" /> Add chapter
        </Button>
      </div>
    </div>
  )
}

export const AddQuestion = ({ chapterIndex }: { chapterIndex: number }) => {
  const {
    control,
    register,
    formState: { errors },
    watch,
  } = useFormContextCreateCourse()

  const { chapters } = watch()

  const { fields, append, remove } = useFieldArray({
    control,
    name: `chapters.${chapterIndex}.questions`,
  })

  return (
    <div className="p-4 rounded">
      {fields.map((item, questionIndex) => (
        <Accordion type="single" key={item.id} collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              {chapters?.[chapterIndex]?.['questions']?.[questionIndex]
                ?.question || '-'}
            </AccordionTrigger>
            <AccordionContent>
              <div className={`flex justify-end my-2`}>
                <Button
                  variant={'ghost'}
                  className="text-xs text-gray-600 underline underline-offset-2"
                  onClick={() => {
                    remove(questionIndex)
                  }}
                >
                  remove question
                </Button>
              </div>

              <div className={`flex flex-col  `}>
                <Label
                  title="Question"
                  error={
                    errors.chapters?.[chapterIndex]?.questions?.[questionIndex]
                      ?.question?.message
                  }
                >
                  <Input
                    placeholder="Question"
                    {...register(
                      `chapters.${chapterIndex}.questions.${questionIndex}.question`,
                    )}
                  />
                </Label>
                <Label
                  title="Answer"
                  error={
                    errors.chapters?.[chapterIndex]?.questions?.[questionIndex]
                      ?.answer?.message
                  }
                >
                  <TextArea
                    placeholder="Answer"
                    {...register(
                      `chapters.${chapterIndex}.questions.${questionIndex}.answer`,
                    )}
                  />
                </Label>
                <Label
                  title="Explanation"
                  error={
                    errors.chapters?.[chapterIndex]?.questions?.[questionIndex]
                      ?.explanation?.message
                  }
                >
                  <TextArea
                    placeholder="Explanation"
                    {...register(
                      `chapters.${chapterIndex}.questions.${questionIndex}.explanation`,
                    )}
                  />
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
      <div>
        <Button
          className="flex items-center justify-center w-full py-2 text-xs"
          variant={'outline'}
          onClick={() =>
            append({
              answer: '',
              question: '',
              explanation: '',
            })
          }
        >
          <Plus className="w-4 h-4" /> Add question
        </Button>
      </div>
    </div>
  )
}
