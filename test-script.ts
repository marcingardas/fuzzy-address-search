import { fuzzySearchAddress, initialise, IntegrationType } from "./src/index";

const test = async () => {
  if (!process.env.TEST_TOM_TOM_API_KEY) {
    console.error(
      "Please provide a TOM TOM API key in order to test this package"
    );

    return;
  }

  initialise(IntegrationType.TOMTOM, process.env.TEST_TOM_TOM_API_KEY);

  console.log("Result: ", await fuzzySearchAddress("1 George St, Sydney"));
};

test();
