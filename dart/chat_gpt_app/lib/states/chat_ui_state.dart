import 'package:hooks_riverpod/hooks_riverpod.dart';

class ChatUiState {
  final bool requestLoading;

  ChatUiState({
    this.requestLoading = false,
  });
}

class ChatUiStateNotifier extends StateNotifier<ChatUiState> {
  ChatUiStateNotifier() : super(ChatUiState());

  setRequestLoading(bool requestLoading) {
    state = ChatUiState(requestLoading: requestLoading);
  }
}

final chatUiProvider = StateNotifierProvider<ChatUiStateNotifier, ChatUiState>(
  (ref) => ChatUiStateNotifier(),
);
