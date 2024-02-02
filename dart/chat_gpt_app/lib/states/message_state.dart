import 'package:app/models/message.dart';
import 'package:app/services/injection.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class MessageListNotifier extends StateNotifier<List<Message>> {
  MessageListNotifier() : super([]) {
    init();
  }

  Future init() async {
    state = await db.messageDao.findAllMessages();
  }

  addMessage(Message message) {
    db.messageDao.upsertMessage(message);

    state = [...state, message];
  }

  upsertMessage(Message partialMessage) {
    final index =
        state.indexWhere((element) => element.id == partialMessage.id);
    var message = partialMessage;

    if (index >= 0) {
      final msg = state[index];
      var buffer = StringBuffer();
      buffer.write(msg.content);
      buffer.write(message.content);
      message = message.copyWith(
        content: buffer.toString(),
      );
    }

    db.messageDao.upsertMessage(message);

    if (index == -1) {
      state = [...state, message];
    } else {
      state = [...state]..[index] = message;
    }
  }
}

final messageListProvider =
    StateNotifierProvider<MessageListNotifier, List<Message>>(
  (ref) => MessageListNotifier(),
);
