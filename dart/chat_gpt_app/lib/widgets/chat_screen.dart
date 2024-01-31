import 'package:app/models/message.dart';
import 'package:app/services/injection.dart';
import 'package:app/states/chat_ui_state.dart';
import 'package:app/states/message_state.dart';
import 'package:app/utils/logger.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';

class ChatScreen extends HookConsumerWidget {
  const ChatScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final messages = ref.watch(messageListProvider);
    final chatUiState = ref.watch(chatUiProvider);
    final textController = TextEditingController();

    requestChatGPT() async {
      ref.read(chatUiProvider.notifier).setRequestLoading(true);

      try {
        final res = await chatgpt.sendChat(textController.text);
        final text = res.choices.first.message?.content ?? "";
        final message =
            Message(content: text, isUser: false, timestamp: DateTime.now());
        ref.read(messageListProvider.notifier).addMessage(message);
      } catch (err) {
        logger.e("requestChatGPT error: $err");
      } finally {
        ref.read(chatUiProvider.notifier).setRequestLoading(false);
      }
    }

    sendMessage() {
      var text = textController.text;
      final message =
          Message(content: text, isUser: true, timestamp: DateTime.now());
      ref.read(messageListProvider.notifier).addMessage(message);
      requestChatGPT();
      textController.clear();
    }

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text('Chat'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: [
            Expanded(
              child: ListView.separated(
                itemBuilder: (ctx, idx) => MessageItem(message: messages[idx]),
                separatorBuilder: (ctx, idx) => const Divider(height: 16),
                itemCount: messages.length,
              ),
            ),
            TextField(
              enabled: !chatUiState.requestLoading,
              controller: textController,
              decoration: InputDecoration(
                hintText: 'Type a message',
                suffixIcon: IconButton(
                  onPressed: sendMessage,
                  icon: const Icon(
                    Icons.send,
                  ),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}

class MessageItem extends StatelessWidget {
  const MessageItem({super.key, required this.message});

  final Message message;

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        CircleAvatar(
          backgroundColor: message.isUser ? Colors.blue : Colors.grey,
          foregroundColor: Colors.white,
          child: Text(message.isUser ? 'You' : 'GPT'),
        ),
        const SizedBox(
          width: 8,
        ),
        Flexible(
          child: Padding(
            padding: const EdgeInsets.only(top: 8),
            child: Text(message.content),
          ),
        ),
      ],
    );
  }
}
