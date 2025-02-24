import type { Officers } from "@/types/Officers";
import { Delete, Fetch, Post } from "./ApiService";
import { apiConstants } from "./ApiConstant";
import { useOfficerStore } from "@/stores/officerStore";


export async function fetchOfficers(): Promise<Officers[]> {
    const state = useOfficerStore()

    const officers = await Fetch(apiConstants.OFFICERS);
    state.setOfficers(officers);
    return officers;
}

export async function addOfficer(officer: Officers): Promise<Officers> {
    console.log(officer)
    const item = await Post(apiConstants.OFFICERS, officer, { "Content-Type": "application/json" });
    return item;
}

export async function deleteOfficer(officerId: string) {
    return await Delete(`${apiConstants.OFFICERS}/${officerId}`);
}