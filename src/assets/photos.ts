import Apples from "./apple.png";
import Oranges from "./orange.png";
import Beans from "./beans.png";
import Cabbage from "./cabbage.png";

export interface IPhotoSelector {
  Apples: string;
  Oranges: string;
  Beans: string;
  Cabbage: string;
}
export const photos = {
  Apples,
  Oranges,
  Beans,
  Cabbage,
};
