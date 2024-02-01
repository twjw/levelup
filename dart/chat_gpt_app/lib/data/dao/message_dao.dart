import 'package:floor/floor.dart';
import 'package:app/models/message.dart';

@dao
abstract class MessageDao {
  @Query('select * from Message')
  Future<List<Message>> findAllMessages();

  @Query('select * from Message where id = :id')
  Future<Message?> findMessagesById(String id);

  @Insert(onConflict: OnConflictStrategy.replace)
  Future<void> upsertMessage(Message message);

  @delete
  Future<void> deleteMessage(Message message);
}
