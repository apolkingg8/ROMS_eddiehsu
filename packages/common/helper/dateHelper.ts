
export class DateHelper {
    getRandomDate = (start: string, end: string)=> {
        const startTime = new Date(start).getTime()
        const endTime = new Date(end).getTime()
        const gapTime = endTime - startTime
        const randomTime = Math.floor(Math.random() * gapTime)

        return new Date(startTime + randomTime)
    }
}

export default new DateHelper()
