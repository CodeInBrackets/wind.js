/**
 * Copyright (c) 2018-present, tarant
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Actor, { IActor } from '../actor-system/actor'
import { IEvent, IEventSourced, IEventToApply } from './event-sourced'

const JOURNAL = '/journal/'
const FAMILY = '/journal/family/'
const STREAM = '/stream/'

export interface IEventSourcedActor extends IActor, IEventSourced {}

export abstract class EventSourcedActor extends Actor implements IEventSourcedActor {
  private readonly events: IEvent[] = []

  public apply(event: (...args: any[]) => void, data: any[]): void {
    event.call(this, ...data)
    this.events.push({
      data,
      family: this.constructor.name,
      name: event.name,
      stream: this.id,
      version: event.length + 1,
    })
  }

  public applyAll(...events: IEventToApply[]): void {
    events.forEach(event => this.apply(event.event, event.data))
  }

  public journal(): IEvent[] {
    return [...this.events]
  }

  public source(events: IEvent[]): void {
    events.forEach(event => {
      (this as any)[event.name].call(this, ...event.data)
      this.events.push(event)
    })
  }

  public subscribeToJournal(): void {
    this.partitionSet.add(JOURNAL)
    this.refreshMailbox()
  }

  public subscribeToFamily(family: new (...args: any[]) => any): void {
    this.partitionSet.add(FAMILY + family.name)
    this.refreshMailbox()
    return
  }

  public subscribeToStream(stream: IEventSourced): void {
    this.partitionSet.add(FAMILY + stream.constructor.name + STREAM + stream.id)
    this.refreshMailbox()
    return
  }

  public version(): number {
    return this.events.length + 1
  }
}