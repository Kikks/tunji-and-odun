import { v2 as cloudinary } from "cloudinary";

const CLOUD_NAME = "kikks";
const DEFAULT_TRANSFORM = "f_auto,q_auto,c_limit,w_600";
const DEFAULT_ALT = "Tunji & Odun";

cloudinary.config({
	cloud_name: CLOUD_NAME,
	api_key: import.meta.env.CLOUDINARY_API_KEY,
	api_secret: import.meta.env.CLOUDINARY_API_SECRET,
	secure: true
});

export type GalleryPhoto = { src: string; alt: string };

type CloudinarySearchResource = {
	public_id: string;
	created_at: string;
	context?: {
		alt?: string;
		caption?: string;
		custom?: {
			[x: string]: string | undefined;
			alt?: string;
		};
	};
};

export async function getFolderPhotos(
	folder: string,
	{ transform = DEFAULT_TRANSFORM, max = 500 } = {}
): Promise<GalleryPhoto[]> {
	const result = await cloudinary.search
		.expression(`folder:"${folder}" AND resource_type:image`)
		.with_field("context")
		.sort_by("created_at", "desc")
		.max_results(max)
		.execute();

	const resources = (result.resources ?? []) as CloudinarySearchResource[];

	return resources.map(r => {
		const ctx = r.context?.custom ?? r.context ?? {};
		const alt = ctx.alt || ctx.caption || DEFAULT_ALT;
		return {
			src: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transform}/${r.public_id}`,
			alt
		};
	});
}
