import fs from 'fs'
import PromptSync from 'prompt-sync'
import { evaluate } from 'mathjs'

const prompt = PromptSync()

function evaluateExpression(expression) {
  try {
    expression = expression.replace(/\^/g, '**')
    return evaluate(expression)
  } catch (error) {
    return 'Error'
  }
}

const inputFile = prompt('Enter the input file name: ')
const outputFile = prompt('Enter the output file name: ')

try {
  const expressions = fs.readFileSync(inputFile, 'utf8').split('\n')

  const results = expressions.map((expression) => {
    if (expression.trim() === '') return ''

    const [lhs] = expression.split('=')
    if (!lhs) return `${expression.trim()} Error`

    const value = evaluateExpression(lhs.trim())
    return `${lhs.trim()} = ${value}`
  })

  fs.writeFileSync(outputFile, results.join('\n'))
  console.log(`Results have been written to ${outputFile}`)
} catch (error) {
  console.error(
    'Error processing files. Please ensure file paths and content are correct.'
  )
}
