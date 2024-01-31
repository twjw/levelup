import 'package:app/models/message.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class MessageListNotifier extends StateNotifier<List<Message>> {
  MessageListNotifier() : super([]);

  addMessage(Message message) {
    state = [...state, message];
  }

  upsertMessage(Message partialMessage) {
    final index =
        state.indexWhere((element) => element.id == partialMessage.id);

    if (index == -1) {
      state = [...state, partialMessage];
    } else {
      final msg = state[index];
      var buffer = StringBuffer();
      buffer.write(msg.content);
      buffer.write(partialMessage.content);
      state = [...state]..[index] = partialMessage.copyWith(
          content: buffer.toString(),
        );
    }
  }
}

final messageListProvider =
    StateNotifierProvider<MessageListNotifier, List<Message>>(
  (ref) => MessageListNotifier(),
);
