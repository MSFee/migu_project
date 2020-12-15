import { useLocalStore } from "mobx-react-lite";

export default function useStore() {
  return useLocalStore(() => ({
    currentKey: "",
    setCurrentKey(value) {
      this.currentKey = value;
    },
    get getCurrentKey(){
      return this.currentKey
    },

    currentIndex: 0,
    setCurrentIndex(value) {
      this.currentIndex = value;
    },
  }));
}
