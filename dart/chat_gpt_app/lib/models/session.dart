import 'package:copy_with_extension/copy_with_extension.dart';
import 'package:floor/floor.dart';

part 'session.g.dart';

@CopyWith()
@entity
class Session {
  @PrimaryKey(autoGenerate: true)
  final int? id;
  final String title;

  Session({this.id, required this.title});
}
