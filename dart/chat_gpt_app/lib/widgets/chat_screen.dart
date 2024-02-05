import 'package:app/markdown/latex.dart';
import 'package:app/models/message.dart';
import 'package:app/services/injection.dart';
import 'package:app/states/chat_ui_state.dart';
import 'package:app/states/message_state.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:markdown_widget/config/all.dart';

class ChatScreen extends HookConsumerWidget {
  const ChatScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text('Chat'),
      ),
      body: const Padding(
        padding: EdgeInsets.all(8.0),
        child: Column(
          children: [
            Expanded(
              child: ChatMessageList(),
            ),
            UserInput(),
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
          child: Container(
            margin: const EdgeInsets.only(right: 48),
            child: MessageContent(message: message),
          ),
        ),
      ],
    );
  }
}

class MessageContent extends StatelessWidget {
  const MessageContent({super.key, required this.message});

  final Message message;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: MarkdownGenerator(
        generators: [
          latexGenerator,
        ],
        inlineSyntaxList: [
          LatexSyntax(),
        ],
      ).buildWidgets(message.content),
    );
  }
}

class ChatMessageList extends HookConsumerWidget {
  const ChatMessageList({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final messages = ref.watch(messageListProvider);
    final listController = useScrollController();

    ref.listen(messageListProvider, (previous, next) {
      Future.delayed(
        const Duration(microseconds: 50),
        () {
          listController.jumpTo(
            listController.position.maxScrollExtent,
          );
        },
      );
    });

    return ListView.separated(
      controller: listController,
      itemBuilder: (ctx, idx) => MessageItem(message: messages[idx]),
      separatorBuilder: (ctx, idx) => const Divider(height: 16),
      itemCount: messages.length,
    );
  }
}

class UserInput extends HookConsumerWidget {
  const UserInput({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final chatUiState = ref.watch(chatUiProvider);
    final textController = useTextEditingController();

    return TextField(
      enabled: !chatUiState.requestLoading,
      controller: textController,
      decoration: InputDecoration(
        hintText: 'Type a message',
        suffixIcon: IconButton(
          onPressed: () {
            sendMessage(ref, textController);
          },
          icon: const Icon(
            Icons.send,
          ),
        ),
      ),
    );
  }

  sendMessage(WidgetRef ref, TextEditingController controller) {
    var text = controller.text;
    final message = Message(
        id: uuid.v4(),
        content: text,
        isUser: true,
        timestamp: DateTime.now(),
        sessionId: 1);
    ref.read(messageListProvider.notifier).addMessage(message);
    requestChatGPT(ref, controller);
    controller.clear();
  }

  requestChatGPT(WidgetRef ref, TextEditingController controller) {
    final id = uuid.v4();
    ref.read(chatUiProvider.notifier).setRequestLoading(true);

    chatgpt.streamChat(controller.text, onSuccess: (text) {
      final message = Message(
        id: id,
        content: text,
        isUser: false,
        timestamp: DateTime.now(),
        sessionId: 1,
      );
      ref.read(messageListProvider.notifier).upsertMessage(message);
      ref.read(chatUiProvider.notifier).setRequestLoading(false);
    }, onError: () {
      ref.read(chatUiProvider.notifier).setRequestLoading(false);
    });
  }
}
