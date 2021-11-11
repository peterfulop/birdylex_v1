export default class {

    generateID_short() {
        return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    async getData(url, target) {
        let data = await Global.fetchWithReturn(url);
        await createObjectModel(data, target);
    };

    async createObjectModel(data, target, Object) {
        target = Array.from(data).map(item => {
            return new Object(data.id, data.lang_code, data.lang_name, data.icon);
        });
    };

    async getParams(match) {

        const values = match.result.slice(1);
        const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

        return Object.fromEntries(keys.map((key, i) => {
            return [key, values[i]];
        }));
    };

}

