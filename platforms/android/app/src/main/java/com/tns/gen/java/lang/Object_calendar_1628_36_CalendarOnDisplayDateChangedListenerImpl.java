/* AUTO-GENERATED FILE. DO NOT MODIFY.
 * This class was automatically generated by the
 * static binding generator from the resources it found.
 * Please do not modify by hand.
 */
package com.tns.gen.java.lang;

public class Object_calendar_1628_36_CalendarOnDisplayDateChangedListenerImpl
    extends java.lang.Object
    implements com.tns.NativeScriptHashCodeProvider,
        com.telerik.widget.calendar.RadCalendarView.OnDisplayDateChangedListener {
  public Object_calendar_1628_36_CalendarOnDisplayDateChangedListenerImpl() {
    super();
    com.tns.Runtime.initInstance(this);
  }

  public void onDisplayDateChanged(long param_0, long param_1) {
    java.lang.Object[] args = new java.lang.Object[2];
    args[0] = param_0;
    args[1] = param_1;
    com.tns.Runtime.callJSMethod(this, "onDisplayDateChanged", void.class, args);
  }

  public int hashCode__super() {
    return super.hashCode();
  }

  public boolean equals__super(java.lang.Object other) {
    return super.equals(other);
  }
}
