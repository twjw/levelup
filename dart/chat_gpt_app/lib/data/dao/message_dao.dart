import 'package:floor/floor.dart';
import 'package:app/models/message.dart';

@dao
abstract class MessageDao {
  @Query('SELECT * FROM message')
  Future<List<Message>> findAllMessages();

  @Query('SELECT * FROM message WHERE id = :id')
  Future<Message?> findMessagesById(String id);

  @Insert(onConflict: OnConflictStrategy.replace)
  Future<void> upsertMessage(Message message);

  @delete
  Future<void> deleteMessage(Message message);

  @Query('SELECT * FROM message WHERE session_id = :sessionId')
  Future<List<Message>> findMessagesBySessionId(int sessionId);
}
