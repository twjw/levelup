import 'package:app/models/message.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class MessageListNotifier extends StateNotifier<List<Message>> {
  MessageListNotifier() : super([]);

  void addMessage(Message message) {
    state = [...state, message];
  }
}

final messageListProvider =
    StateNotifierProvider<MessageListNotifier, List<Message>>(
  (ref) => MessageListNotifier(),
);
