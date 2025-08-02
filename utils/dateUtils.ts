export class DateUtils {

    /**
     * Converts date as string in format 2014/JAN/10 to 2024/01/10
     * @param dateAsString - date as string in format: 2014/JAN/10
     * @returns date in 2024/01/10 format
     */
    static convertDateFormat(dateAsString: string, signForDelimeter?: string): string {
        const date = {
            JAN: "01", FEB: "02", MAR: "03", APR: "04",
            MAY: "05", JUN: "06", JUL: "07", AUG: "08",
            SEP: "09", OCT: "10", NOV: "11", DEC: "12"
        };

        const [yyyy, mm, dd]: string[] = dateAsString.split("/");
        const month: string = date[mm];

        const delimeterSign: string = signForDelimeter ? signForDelimeter : "-";

        return `${yyyy}${delimeterSign}${month}${delimeterSign}${dd.padStart(2, "0")}`;
    }

}