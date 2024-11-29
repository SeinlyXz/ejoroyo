import { pb } from "$lib/pocketbase";

export const load = async ( event ) => {
    const tests = await pb.collection('test').getFullList({})
    return {
        tests
    }
}