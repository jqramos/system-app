import Art, {IArt} from "@entities/Art";

export default class ArtRepository {

    public findById(id: any, callback: any) {
        Art.findById(id, callback)
    }

    public create(params: IArt, callback: any) {
        const _session = new Art(params);
        _session.save(callback);
    }

    public update(id: string, params: IArt, callback: any) {
        Art.findByIdAndUpdate(id, params, callback)
    }

    public delete(id: string, callback: any) {
        Art.findByIdAndDelete(id, callback)
    }

    public search(query: any, options: any, callback: any) {
        Art.paginate(query, options, callback);
    }
}
