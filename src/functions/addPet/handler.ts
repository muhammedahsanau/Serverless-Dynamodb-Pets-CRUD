import { middyfy } from "@libs/lambda";
import { formatJSONResponse } from "@libs/apiGateway";
 
import { Dynamo } from "../../libs/Dynamo";
import { table_name } from "@libs/constants";

export const addPet = async (event) => {
  let pet = event.body;
  let id = await Math.floor( 10000000 + Math.random() * 123456);
  pet.id = id;
  const newPet = await Dynamo.addPET(pet, table_name);
  return formatJSONResponse({
    Res: newPet,
  });
};

export const main = middyfy(addPet);
