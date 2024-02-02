import 'package:floor/floor.dart';
import 'package:copy_with_extension/copy_with_extension.dart';

part 'message.g.dart';

@CopyWith()
@entity
class Message {
  @primaryKey
  final String id;
  final String content;
  final bool isUser;
  final DateTime timestamp;

  Message(
      {required this.id,
      required this.content,
      required this.isUser,
      required this.timestamp});
}
