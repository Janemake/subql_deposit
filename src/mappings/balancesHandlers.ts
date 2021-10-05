import {SubstrateEvent} from "@subql/types";
import {timestamp, eventId} from "./globalFunction";
import {Deposit,} from "../types/models";

import {Balance} from "@polkadot/types/interfaces";

export async function handleDeposit(event: SubstrateEvent): Promise<void> {

    const {event: {data: [acountID, amount]}} = event;

    const address = acountID.toString();
    const amountBalance = (amount as Balance).toBigInt();

    const element = new Deposit(eventId(event));

    element.timestamp = timestamp(event.block);
    element.depositAccount = address;
    element.depositAmount = amountBalance;

    await element.save();
    logger.info('Deposit from' + address);
}
