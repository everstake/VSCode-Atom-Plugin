import * as vscode from 'vscode';

import { NodeItem } from '@/trees/items';
import { Substrate } from '@/substrate';
import { TreeView } from '@/common';

type Item = NodeItem;

export type NodeInfo = { name: string, endpoint: string };

export class NodesTreeView extends TreeView<Item> {
	constructor(private context: vscode.ExtensionContext, private substrate: Substrate) {
		super();
	}

	getChildren(element?: Item): Thenable<Item[]> {
		const items = this.getItems(element);
		return Promise.resolve(items);
	}

	getItems(element?: Item): Item[] {
		const nodes = this.substrate.getNodes();
		const node = this.context.globalState.get('connected-node');
		const isConnected = this.substrate.isConnected;
		return nodes.map(({ name, endpoint }) => {
			const isActive = node === name;
			return new NodeItem(this.context, name, endpoint, isActive, isActive && isConnected);
		});
	}
}
