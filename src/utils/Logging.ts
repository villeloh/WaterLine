export const logMethodCall = (target: any, methodName: string, descriptor: PropertyDescriptor) => {
  // Store a reference to the original method
  const originalMethod = descriptor.value;

  // Replace the method with a new function
  descriptor.value = function (...args: any[]) {
    console.log(`========== ${methodName} ==========`);

    const argNames = getArgumentNames(originalMethod);
    argNames.forEach((argName, index) => {
      const argValue = args[index];
      console.log(`${argName}: ${argValue}`);
    });
    console.log(`========== ${methodName.replace(/./g, '=')} ==========`);

    // Call the original method and return its result
    return originalMethod.apply(this, args);
  };
}

function getArgumentNames(fn: Function) {
  // Convert the function to a string representation
  const fnString = fn.toString().replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '');

  // Extract the arguments from the string representation
  const result = fnString.slice(fnString.indexOf('(') + 1, fnString.indexOf(')'))
    .match(/([^\s,]+)/g);

  return result === null ? [] : result;
}
