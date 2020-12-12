/** Called when directives inject each other (creating a circular dependency) */
export function throwCyclicDependencyError(token) {
    throw new Error("Cannot instantiate cyclic dependency! " + token);
}
/** Called when there are multiple component selectors that match a given node */
export function throwMultipleComponentError(tNode) {
    throw new Error("Multiple components match node with tagname " + tNode.tagName);
}
/** Throws an ExpressionChangedAfterChecked error if checkNoChanges mode is on. */
export function throwErrorIfNoChangesMode(creationMode, oldValue, currValue) {
    var msg = "ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: '" + oldValue + "'. Current value: '" + currValue + "'.";
    if (creationMode) {
        msg +=
            " It seems like the view has been created after its parent and its children have been dirty checked." +
                " Has it been created in a change detection hook ?";
    }
    // TODO: include debug context
    throw new Error(msg);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9lcnJvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBVUEsZ0ZBQWdGO0FBQ2hGLE1BQU0sVUFBVSwwQkFBMEIsQ0FBQyxLQUFVO0lBQ25ELE1BQU0sSUFBSSxLQUFLLENBQUMsMkNBQXlDLEtBQU8sQ0FBQyxDQUFDO0FBQ3BFLENBQUM7QUFFRCxpRkFBaUY7QUFDakYsTUFBTSxVQUFVLDJCQUEyQixDQUFDLEtBQVk7SUFDdEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxpREFBK0MsS0FBSyxDQUFDLE9BQVMsQ0FBQyxDQUFDO0FBQ2xGLENBQUM7QUFFRCxrRkFBa0Y7QUFDbEYsTUFBTSxVQUFVLHlCQUF5QixDQUNyQyxZQUFxQixFQUFFLFFBQWEsRUFBRSxTQUFjO0lBQ3RELElBQUksR0FBRyxHQUNILGdIQUE4RyxRQUFRLDJCQUFzQixTQUFTLE9BQUksQ0FBQztJQUM5SixJQUFJLFlBQVksRUFBRTtRQUNoQixHQUFHO1lBQ0MscUdBQXFHO2dCQUNyRyxtREFBbUQsQ0FBQztLQUN6RDtJQUNELDhCQUE4QjtJQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7VE5vZGV9IGZyb20gJy4vaW50ZXJmYWNlcy9ub2RlJztcblxuLyoqIENhbGxlZCB3aGVuIGRpcmVjdGl2ZXMgaW5qZWN0IGVhY2ggb3RoZXIgKGNyZWF0aW5nIGEgY2lyY3VsYXIgZGVwZW5kZW5jeSkgKi9cbmV4cG9ydCBmdW5jdGlvbiB0aHJvd0N5Y2xpY0RlcGVuZGVuY3lFcnJvcih0b2tlbjogYW55KTogbmV2ZXIge1xuICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBpbnN0YW50aWF0ZSBjeWNsaWMgZGVwZW5kZW5jeSEgJHt0b2tlbn1gKTtcbn1cblxuLyoqIENhbGxlZCB3aGVuIHRoZXJlIGFyZSBtdWx0aXBsZSBjb21wb25lbnQgc2VsZWN0b3JzIHRoYXQgbWF0Y2ggYSBnaXZlbiBub2RlICovXG5leHBvcnQgZnVuY3Rpb24gdGhyb3dNdWx0aXBsZUNvbXBvbmVudEVycm9yKHROb2RlOiBUTm9kZSk6IG5ldmVyIHtcbiAgdGhyb3cgbmV3IEVycm9yKGBNdWx0aXBsZSBjb21wb25lbnRzIG1hdGNoIG5vZGUgd2l0aCB0YWduYW1lICR7dE5vZGUudGFnTmFtZX1gKTtcbn1cblxuLyoqIFRocm93cyBhbiBFeHByZXNzaW9uQ2hhbmdlZEFmdGVyQ2hlY2tlZCBlcnJvciBpZiBjaGVja05vQ2hhbmdlcyBtb2RlIGlzIG9uLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRocm93RXJyb3JJZk5vQ2hhbmdlc01vZGUoXG4gICAgY3JlYXRpb25Nb2RlOiBib29sZWFuLCBvbGRWYWx1ZTogYW55LCBjdXJyVmFsdWU6IGFueSk6IG5ldmVyfHZvaWQge1xuICBsZXQgbXNnID1cbiAgICAgIGBFeHByZXNzaW9uQ2hhbmdlZEFmdGVySXRIYXNCZWVuQ2hlY2tlZEVycm9yOiBFeHByZXNzaW9uIGhhcyBjaGFuZ2VkIGFmdGVyIGl0IHdhcyBjaGVja2VkLiBQcmV2aW91cyB2YWx1ZTogJyR7b2xkVmFsdWV9Jy4gQ3VycmVudCB2YWx1ZTogJyR7Y3VyclZhbHVlfScuYDtcbiAgaWYgKGNyZWF0aW9uTW9kZSkge1xuICAgIG1zZyArPVxuICAgICAgICBgIEl0IHNlZW1zIGxpa2UgdGhlIHZpZXcgaGFzIGJlZW4gY3JlYXRlZCBhZnRlciBpdHMgcGFyZW50IGFuZCBpdHMgY2hpbGRyZW4gaGF2ZSBiZWVuIGRpcnR5IGNoZWNrZWQuYCArXG4gICAgICAgIGAgSGFzIGl0IGJlZW4gY3JlYXRlZCBpbiBhIGNoYW5nZSBkZXRlY3Rpb24gaG9vayA/YDtcbiAgfVxuICAvLyBUT0RPOiBpbmNsdWRlIGRlYnVnIGNvbnRleHRcbiAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG59XG4iXX0=