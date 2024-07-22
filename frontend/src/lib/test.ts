const setupMyThing = (id: string) => {
  const cleanup = () => {};

  return cleanup;
};

// Vanilla
const timeout = setTimeout(() => {
  console.log("2 seconds passed");
}, 2000);

// .. Do whatever the fuck you want

clearTimeout(timeout);

// Custom
const setMyTimeout = (func: () => void, delay: number) => {
  const timeout = setTimeout(func, delay);

  return {
    cleanup: () => {
      clearTimeout(timeout);
    },
  };
};

const myTimeout = setMyTimeout(() => {
  console.log("2 seconds passed");
}, 2000);

// .. Do whatever the fuck you want

myTimeout.cleanup();

//

const myThing1Cleanup = setupMyThing("thing1");

const myThing2Cleanup = setupMyThing("thing2");

// use my thing

myThing1Cleanup();
myThing2Cleanup();

//
