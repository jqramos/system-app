import Art, {IArt} from "@entities/Art";

export default class ArtRepository {

    public findById(id: any, callback: any) {
        Art.findById(id, callback)
    }

    public create(params: IArt, callback: any) {
        const _session = new Art(params);
        _session.save(callback);
    }
}
