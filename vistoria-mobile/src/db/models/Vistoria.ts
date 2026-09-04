import { Model } from "@nozbe/watermelondb";
import { date, field } from "@nozbe/watermelondb/decorators";

export class VistoriaModel extends Model {
  static table = "vistorias";

  @field("user_id") userId: string;
  @field("description") description: string;
  @field("photo_mime_type") photoMimeType: string | null;
  @field("latitude") latitude: number | null;
  @field("longitude") longitude: number | null;
  @field("pendente") pendente: boolean;
  @date("completed_at") completedAt: Date | null;
  @date("created_at") createdAt: Date;
  @date("updated_at") updatedAt: Date;
}
