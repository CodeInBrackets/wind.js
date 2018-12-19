import Actor from '../actor'
import ActorMessage from '../actor-message'

export default interface IMaterializer {
  onInitialize(actor: Actor): void
  onBeforeMessage(actor: Actor, message: ActorMessage): void
  onAfterMessage(actor: Actor, message: ActorMessage): void
  onError(actor: Actor, message: ActorMessage, error: any): void
}