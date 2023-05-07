/* eslint-disable @typescript-eslint/ban-types */
import React, { ReactNode } from 'react'

interface LoggerProps {
  children: ReactNode
}

export const LogProps: React.FC<LoggerProps> = ({ children }) => {
  const child = React.Children.only(children) as React.ReactElement<any>
  console.log('Props: ', child.props)
  return child
}

export const logMethodCall = (fn: Function, ...args: any[]) => {
  console.log(`========== ${fn.name} ==========`)
  args.forEach((arg, index) => {
    console.log(`arg ${index + 1}: ${JSON.stringify(arg)}`)
  })

  return fn(...args)
}

// decorator. NOTE: only works inside classes
export const logMethodCallDec = (
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor,
) => {
  // Store a reference to the original method
  const originalMethod = descriptor.value

  // Replace the method with a new function
  descriptor.value = function (...args: any[]) {
    console.log(`========== ${methodName} ==========`)

    const argNames = _getArgumentNames(originalMethod)
    argNames.forEach((argName, index) => {
      const argValue = args[index]
      console.log(`${argName}: ${argValue}`)
    })
    console.log(`===========${methodName.replace(/./g, '=')}===========`)

    // Call the original method and return its result
    return originalMethod.apply(this, args)
  }
}

function _getArgumentNames(fn: Function) {
  // Convert the function to a string representation
  const fnString = fn.toString().replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, '')

  // Extract the arguments from the string representation
  const result = fnString
    .slice(fnString.indexOf('(') + 1, fnString.indexOf(')'))
    .match(/([^\s,]+)/g)

  return result === null ? [] : result
}
