import {CustomSettingMultiple} from "../customSetup.js";
export let options;
window.addEventListener("load", () => {
  options = [
    new CustomSettingMultiple("Main Color", "red", "options", ["red", "blue", "green", "yellow", "purple"])
  ];
});