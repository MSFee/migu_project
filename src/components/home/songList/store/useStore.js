import { useLocalStore } from "mobx-react-lite";

export default function UserStore() {
    return useLocalStore(() => ({
        currentKey: [],
        setCurrentKey(value) {
            this.currentKey = value;
        },
        get getCurrentKey() {
            return this.currentKey
        },
    }))
}