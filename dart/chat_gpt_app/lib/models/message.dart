import 'package:app/models/session.dart';
import 'package:floor/floor.dart';
import 'package:copy_with_extension/copy_with_extension.dart';

part 'message.g.dart';

@CopyWith()
@Entity(tableName: 'message', foreignKeys: [
  ForeignKey(
    childColumns: ["session_id"],
    parentColumns: ['id'],
    entity: Session,
  )
])
class Message {
  @primaryKey
  final String id;
  final String content;
  final bool isUser;
  final DateTime timestamp;
  @ColumnInfo(name: "session_id")
  final int sessionId;

  Message(
      {required this.id,
      required this.content,
      required this.isUser,
      required this.timestamp,
      required this.sessionId});
}
