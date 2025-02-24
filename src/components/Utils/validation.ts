const required = (v: string) => !!v || "The field is required";

const maxLen = (v: string, len: number) => v?.length <= len ? true : `Must be less then ${len} characters`

const numberOnly = (v: string) => /^[0-9]+$/.test(v.trim()) || "The value must be number";

export { required, maxLen, numberOnly };