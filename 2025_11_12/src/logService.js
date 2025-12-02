export default function createLogService(db) {
    const logs = db.collection("logs")

    return {
        async addLog(action, collection, payload) {
            await logs.insertOne({
                timestamp: new Date(),
                action,
                collection,
                payload
            })
        }
    }
}