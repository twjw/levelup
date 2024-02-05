import 'package:app/models/session.dart';
import 'package:floor/floor.dart';
import 'package:app/models/message.dart';

@dao
abstract class SessionDao {
  @Query('SELECT * FROM session ORDER BY id DESC')
  Future<List<Session>> findAllSessions();

  @Query('SELECT * FROM session WHERE id = :id')
  Future<Session?> findSessionById(int id);

  @Insert(onConflict: OnConflictStrategy.replace)
  Future<int> upsertSession(Session session);

  @delete
  Future<void> deleteSession(Session session);
}
