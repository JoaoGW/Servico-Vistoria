import { Model } from "@nozbe/watermelondb";
import { date, field } from "@nozbe/watermelondb/decorators";

export class DocumentoModel extends Model {
  static table = "documentos";

  @field("title") title: string;
  @field("file_mime_type") fileMimeType: string;
  @field("file_name") fileName: string;
  @date("created_at") createdAt: Date;
  @date("updated_at") updatedAt: Date;
}
