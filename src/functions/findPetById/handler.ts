 
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { Dynamo } from "../../libs/Dynamo";
 
import { table_name } from "@libs/constants";
// import { type } from "os";
// import { type } from "os";
const findPetById = async (
  event
) => {
  let {id} = event.pathParameters;
  
  id = Number(id)
  
  
  const pet = await Dynamo.findPetById(id, table_name).catch((err) => {
    console.log("error in Dynamo get", err);
    return null;
  });

  if (!pet) {
    return formatJSONResponse({ message: "the uer is not present in the table" });
  }

  return formatJSONResponse({ message: pet });
};

export const main = middyfy(findPetById);
