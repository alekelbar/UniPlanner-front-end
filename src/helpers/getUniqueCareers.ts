import { Career } from "../interfaces/career.interface";

export function getUniqueCareeers(carr1: Career[], carr2: Career[]) {
  const mergeArr = [...carr1, ...carr2];

  return mergeArr.filter((e) => {
    return !carr2.find((c) => c._id === e._id);
  });
}
