import eventsource from 'eventsource'

// @ts-ignore
global.EventSource = eventsource

export const load = async ( event ) => {
    // let new_data: any[] = []
    // await event.locals.pb.collection('Test').subscribe('*', async function (e) {
    //     new_data = [
    //         ...new_data,
    //         await event.locals.pb.collection('Test').getFullList({})
    //     ]
    // });
    // console.log(new_data)
}