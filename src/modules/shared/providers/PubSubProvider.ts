import { PubSub } from 'graphql-subscriptions';

/*
    PUBSUB_PROVIDER for Graphql subscriptions
*/

export const PUBSUB_PROVIDER =
{
    provide: 'PUB_SUB',
    useValue: new PubSub(),
}
