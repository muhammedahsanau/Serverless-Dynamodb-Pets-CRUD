import { middyfy } from "@libs/lambda";
import { formatJSONResponse } from "@libs/apiGateway";
 
import { Dynamo } from "../../libs/Dynamo";
import { table_name } from "@libs/constants";

export const addPet = async (event) => {
  let pet = event.body;

  //generating 8 digit random number which we can use as a pet id
  let id = await Math.floor( 10000000 + Math.random() * 123456);

  //storing the pet id in the pet object.
  pet.id = id;
  const newPet = await Dynamo.addPET(pet, table_name);
   //passing responce in formatJSONResponse to get 
  // the res with the success status code 
  return formatJSONResponse({
    Res: newPet,
  });
};

export const main = middyfy(addPet);
