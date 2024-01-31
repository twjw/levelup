import 'package:app/env.dart';
import 'package:app/services/injection.dart';
import 'package:openai_api/openai_api.dart';

class ChatGPTService {
  final client = OpenaiClient(
    config: OpenaiConfig(
      apiKey: Env.apiKey, // 你的key
      // baseUrl: "",  // 如果有自建OpenAI服務請設定這裡，如果你自己的代理伺服器不太穩定，這裡可以設定為 https://openai.mignsin.workers.dev/v1
      // httpProxy: "",  // 代理服務地址，例如 clashx，你可以使用 http://127.0.0.1:7890
    ),
  );

  Future<ChatCompletionResponse> sendChat(String content) async {
    final request = ChatCompletionRequest(model: 'gpt-3.5-turbo', messages: [
      ChatMessage(
        content: content,
        role: ChatMessageRole.user,
      )
    ]);
    return await client.sendChatCompletion(request);
  }

  Future streamChat(
    String content, {
    Function(String text)? onSuccess,
    Function()? onError,
  }) async {
    if (onSuccess == null) return;

    final request =
        ChatCompletionRequest(model: 'gpt-3.5-turbo', stream: true, messages: [
      ChatMessage(
        content: content,
        role: ChatMessageRole.user,
      ),
    ]);

    try {
      return await client.sendChatCompletionStream(
        request,
        onSuccess: (p0) {
          final text = p0.choices.first.delta?.content;
          if (text != null) {
            onSuccess.call(text);
          }
        },
      );
    } catch (err) {
      onError?.call();
      logger.e('requestChatGPT error: $err');
    }
  }
}
