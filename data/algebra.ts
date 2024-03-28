export const algebra = {
  title: 'Introduction to Algebra',
  description:
    'Learn the fundamentals of algebra, including variables, equations, functions and graphs.',
  published: true,
  chapters: [
    {
      title: 'Variables and Expressions',
      content: `Algebra uses letters (like x, y, a, b) to represent unknown numbers, called variables. An algebraic expression contains variables, numbers and operation symbols. For example, 2x + 3 is an algebraic expression.[2]

Variables are used to change verbal expressions into algebraic expressions, that is, expressions that are composed of letters that stand for numbers. Key words that can help you translate words into letters and numbers include:
- For addition: sum, more than, greater than, increase
- For subtraction: minus, less than, smaller than, decrease
- For multiplication: times, product, multiplied by, of
- For division: halve, divided by, ratio[2]

Some examples of translating verbal phrases into algebraic expressions:
- "the sum of a number and 5" → x + 5 or 5 + x
- "the number minus 4" → x – 4
- "six times a number" → 6x
- "x divided by 7" → x/7
- "three more than the product of 2 and x" → 2x + 3[2]

To evaluate an algebraic expression, replace the variables with the given values and do the arithmetic, following the order of operations (parentheses, exponents, multiplication/division, addition/subtraction).[2]

An algebraic expression is a combination of constants, variables and algebraic operations (+, -, ×, ÷). We can derive algebraic expressions for given situations or conditions using these combinations.[3]`,
      questions: [
        {
          question: 'What is a variable?',
          answer: 'A letter that represents an unknown number.',
          explanation:
            "In algebra, we use letters as placeholders for numbers we don't know yet. This allows us to write expressions and equations.",
        },
        {
          question: 'What is an example of an algebraic expression?',
          answer: '3x - 7',
          explanation:
            'This expression contains a variable (x), numbers (3 and 7), and operation symbols (multiplication and subtraction).',
        },
        {
          question: 'Evaluate the expression 2x + 3 when x = 5.',
          answer: '13',
          explanation:
            'To evaluate, substitute 5 for x in the expression. This gives 2(5) + 3. Following the order of operations, first multiply 2 by 5 to get 10, then add 3. The result is 13.',
        },
        {
          question: 'What is an algebraic expression?',
          answer:
            'A combination of constants, variables, and algebraic operations.',
          explanation:
            'Algebraic expressions contain numbers (constants), letters (variables), and operation symbols like +, -, ×, and ÷. They allow us to represent mathematical relationships.',
        },
      ],
    },
    {
      title: 'Equations and Inequalities',
      content: `An equation is a mathematical statement that two expressions are equal, using the = symbol. For example, 2x - 3 = 9 is an equation. The key property of an equation is that the values on both sides of the equals sign must be the same.[1]

To solve an equation, we perform the same operation on both sides until the variable is isolated on one side. The goal is to get the variable by itself on one side of the equals sign. For example, to solve 2x - 3 = 9, we first add 3 to both sides to get 2x = 12, then divide both sides by 2 to get x = 6.[1]

An inequality is a mathematical statement comparing two expressions using symbols such as >, <, ≥, or ≤. For example, 3x + 2 < 11 is an inequality. It states that the expression on the left side is less than the value on the right side.[2]

To solve an inequality, we also perform the same operation on both sides, but we must flip the inequality sign whenever we multiply or divide by a negative number. For example, to solve 3x + 2 < 11, we first subtract 2 from both sides to get 3x < 9, then divide both sides by 3 to get x < 3.[2]

The solutions to equations and inequalities can be represented on a number line. For an equation, the solution is a single point. For an inequality, the solution is a range of values, represented by an arrow pointing in the direction of all values that make the inequality true.[3]

Equations and inequalities can also involve more than one variable. These are called systems of equations or inequalities. To solve a system, we use techniques like substitution or elimination to find the values of the variables that make all the equations or inequalities true simultaneously.[4]

Equations and inequalities are fundamental tools in algebra for modeling and solving real-world problems. They allow us to find unknown values, make comparisons, and describe relationships between quantities.[5]`,
      questions: [
        {
          question: 'What is an equation?',
          answer: 'A mathematical statement that two expressions are equal.',
          explanation:
            'Equations are the foundation of algebra. They state that the values on both sides of the equals sign (=) must be the same.',
        },
        {
          question: 'What are the steps to solve 2x - 5 = 11?',
          answer:
            'Add 5 to both sides to get 2x = 16, then divide both sides by 2 to get x = 8.',
          explanation:
            'To solve an equation, perform the same operation on both sides until the variable is isolated. First add 5 to both sides to get the variable term by itself, then divide to get the solution.',
        },
        {
          question: 'What is an inequality?',
          answer:
            'A mathematical statement comparing two expressions using symbols like >, <, ≥, or ≤.',
          explanation:
            'Inequalities are used to describe relationships between quantities that are not equal. The symbols show which side is greater or less than the other.',
        },
        {
          question:
            'How do you represent the solutions to equations and inequalities?',
          answer:
            'On a number line, with a point for an equation and an arrow for an inequality.',
          explanation:
            'Number lines provide a visual representation of solutions. An equation has a single solution point, while an inequality has a range of solutions shown by an arrow.',
        },
        {
          question: 'What is a system of equations or inequalities?',
          answer:
            'A set of two or more equations or inequalities with the same variables.',
          explanation:
            'Systems allow us to model situations with multiple constraints. The solution to a system is the set of variable values that make all the equations or inequalities true at the same time.',
        },
      ],
    },
    {
      title: 'Functions and Graphs',
      content: `A function is a relation between a set of inputs (called the domain) and a set of outputs (called the range), where each input has exactly one output. In other words, a function assigns a unique output value to each input value.[1]

Functions can be represented in various ways, including:
- Equations: A function can be defined by an equation that shows the relationship between the input (usually x) and the output (usually y). For example, y = 2x + 1 is a linear function.[2]
- Tables: A function can be represented by a table that lists input-output pairs. The input values are typically in the left column, with their corresponding output values in the right column.[2]
- Graphs: A function can be visually represented by a graph on a coordinate plane. The graph of a function is the set of all points (x, y) where x is an input value and y is the corresponding output value.[1]

The most common types of functions include:
- Linear functions: These have a constant rate of change and produce a straight-line graph. Their equation is in the form y = mx + b, where m is the slope and b is the y-intercept.[3]
- Quadratic functions: These have a variable rate of change and produce a parabolic (U-shaped) graph. Their equation is in the form y = ax^2 + bx + c, where a, b, and c are constants and a ≠ 0.[3]
- Exponential functions: These have a constant percent rate of change and produce a curved graph. Their equation is in the form y = a(b^x), where a is the initial value and b is the growth or decay factor.[4]

Key features of function graphs include:
- Domain and range: The domain is the set of all possible input (x) values, while the range is the set of all possible output (y) values. These can be determined from the graph or the equation.[5]
- Intercepts: The x-intercept is where the graph crosses the x-axis (y = 0), and the y-intercept is where the graph crosses the y-axis (x = 0). Intercepts can be found by substituting 0 for x or y in the equation.[5]
- Slope: The slope of a linear function is the rate of change, or how steep the line is. It can be calculated as the change in y divided by the change in x between any two points on the line.[5]

Functions and graphs are essential tools for modeling relationships between quantities in the real world, such as distance and time, supply and demand, or population growth.[4]`,
      questions: [
        {
          question: 'What is a function?',
          answer: 'A relation that assigns exactly one output to each input.',
          explanation:
            'Functions are rules that map each element of the domain (input set) to a unique element of the range (output set). Each x-value has one and only one corresponding y-value.',
        },
        {
          question: 'What are the three main ways to represent a function?',
          answer: 'Equations, tables, and graphs.',
          explanation:
            'Functions can be represented algebraically with equations, numerically with input-output tables, or visually with graphs on a coordinate plane. Each representation provides a different perspective on the relationship between the variables.',
        },
        {
          question: 'What is the equation of a linear function?',
          answer: 'y = mx + b, where m is the slope and b is the y-intercept.',
          explanation:
            'Linear functions have a constant rate of change, represented by the slope m. The y-intercept b is where the line crosses the y-axis. The equation shows how to calculate the output y for any input x.',
        },
        {
          question:
            'How can you find the intercepts of a function from its equation?',
          answer:
            'Set y = 0 and solve for x to find the x-intercept, or set x = 0 and solve for y to find the y-intercept.',
          explanation:
            'The x-intercept is where the graph crosses the x-axis, so the y-coordinate is 0. The y-intercept is where the graph crosses the y-axis, so the x-coordinate is 0. Substituting these values into the equation allows you to solve for the other coordinate.',
        },
        {
          question:
            'What is the slope of a linear function and how is it calculated?',
          answer:
            'The slope is the rate of change, calculated as the change in y divided by the change in x between two points.',
          explanation:
            'Slope measures the steepness of a line. It tells you how much the y-value changes for each unit change in the x-value. You can calculate slope by choosing two points on the line and dividing the vertical change (rise) by the horizontal change (run).',
        },
      ],
    },
  ],
}
