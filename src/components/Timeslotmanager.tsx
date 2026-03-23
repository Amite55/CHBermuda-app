import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Svg, { Line, Path } from "react-native-svg";
import tw from "twrnc";
import TimeRangePicker, {
  TimeRangeValue,
  TimeState,
} from "../components/Timerangepicker";

// ── Types ──────────────────────────────────────────────────────────────────

/** Single slot — what you send to the backend */
export interface TimeSlot {
  id: string; // local unique key (not sent to backend)
  startTime: string; // "09:00 AM"
  endTime: string; // "05:00 PM"
}

interface TimeSlotManagerProps {
  /** Called whenever the slot list changes — pass this array to your API */
  onSlotsChange?: (slots: Omit<TimeSlot, "id">[]) => void;
  /** Max slots allowed — default unlimited */
  maxSlots?: number;
  /** Label shown above the picker */
  label?: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────
const pad = (n: number) => String(n).padStart(2, "0");

const fmtTime = (t: TimeState) => `${pad(t.hour)}:${pad(t.minute)} ${t.ampm}`;

const uid = () => Math.random().toString(36).slice(2, 8);

const calcDuration = (start: string, end: string) => {
  const parse = (s: string) => {
    const [time, ampm] = s.split(" ");
    const [h, m] = time.split(":").map(Number);
    let hour = h % 12;
    if (ampm === "PM") hour += 12;
    return hour * 60 + m;
  };
  let diff = parse(end) - parse(start);
  if (diff < 0) diff += 24 * 60;
  const hrs = Math.floor(diff / 60);
  const min = diff % 60;
  return `${hrs}h${min > 0 ? ` ${min}m` : ""}`;
};

const DEFAULT_RANGE: TimeRangeValue = {
  start: { hour: 9, minute: 0, ampm: "AM" },
  end: { hour: 5, minute: 0, ampm: "PM" },
};

// ── Icons ──────────────────────────────────────────────────────────────────
const TrashIcon = () => (
  <Svg
    width={15}
    height={15}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#EF4444"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M3 6h18" />
    <Path d="M19 6l-1 14H6L5 6" />
    <Path d="M8 6V4h8v2" />
  </Svg>
);

const PlusIcon = () => (
  <Svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth={2.5}
    strokeLinecap="round"
  >
    <Line x1="12" y1="5" x2="12" y2="19" />
    <Line x1="5" y1="12" x2="19" y2="12" />
  </Svg>
);

const ClockIcon = () => (
  <Svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#6366F1"
    strokeWidth={2}
    strokeLinecap="round"
  >
    <Path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
    <Path d="M12 6v6l4 2" />
  </Svg>
);

// ── SlotCard ───────────────────────────────────────────────────────────────
const SlotCard = ({
  slot,
  index,
  onDelete,
}: {
  slot: TimeSlot;
  index: number;
  onDelete: () => void;
}) => (
  <View
    style={tw`flex-row items-center bg-indigo-50 border border-indigo-100 rounded-2xl px-4 py-3 mb-2`}
  >
    {/* Index badge */}
    <View
      style={tw`w-7 h-7 rounded-full bg-indigo-500 items-center justify-center mr-3`}
    >
      <Text style={tw`text-white text-xs font-bold`}>{index + 1}</Text>
    </View>

    {/* Times */}
    <View style={tw`flex-1`}>
      <View style={tw`flex-row items-center gap-2`}>
        <Text style={tw`text-sm font-semibold text-indigo-700`}>
          {slot.startTime}
        </Text>
        <Text style={tw`text-indigo-300 text-xs`}>→</Text>
        <Text style={tw`text-sm font-semibold text-indigo-700`}>
          {slot.endTime}
        </Text>
      </View>
      <View style={tw`flex-row items-center gap-1 mt-0.5`}>
        <ClockIcon />
        <Text style={tw`text-xs text-indigo-400`}>
          {calcDuration(slot.startTime, slot.endTime)}
        </Text>
      </View>
    </View>

    {/* Delete */}
    <TouchableOpacity
      onPress={onDelete}
      activeOpacity={0.7}
      style={tw`w-8 h-8 rounded-full bg-red-50 items-center justify-center`}
    >
      <TrashIcon />
    </TouchableOpacity>
  </View>
);

// ── Main Export ────────────────────────────────────────────────────────────
export default function TimeSlotManager({
  onSlotsChange,
  maxSlots,
  label = "Available Time Slots",
}: TimeSlotManagerProps) {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [current, setCurrent] = useState<TimeRangeValue>(DEFAULT_RANGE);
  const [showPicker, setShowPicker] = useState(false);

  const canAdd = !maxSlots || slots.length < maxSlots;

  const handleAdd = () => {
    if (!canAdd) return;

    const newSlot: TimeSlot = {
      id: uid(),
      startTime: fmtTime(current.start),
      endTime: fmtTime(current.end),
    };

    const updated = [...slots, newSlot];
    setSlots(updated);
    setShowPicker(false);
    setCurrent(DEFAULT_RANGE); // reset picker

    // Fire backend-ready payload (strip local `id`)
    onSlotsChange?.(
      updated.map(({ startTime, endTime }) => ({ startTime, endTime })),
    );
  };

  const handleDelete = (id: string) => {
    const updated = slots.filter((s) => s.id !== id);
    setSlots(updated);
    onSlotsChange?.(
      updated.map(({ startTime, endTime }) => ({ startTime, endTime })),
    );
  };

  return (
    <View>
      {/* Section label */}
      <Text
        style={tw`text-sm font-medium uppercase tracking-widest text-black my-3`}
      >
        {label}
      </Text>

      {/* Slot list */}
      {slots.length > 0 && (
        <View style={tw`mb-3`}>
          {slots.map((slot, i) => (
            <SlotCard
              key={slot.id}
              slot={slot}
              index={i}
              onDelete={() => handleDelete(slot.id)}
            />
          ))}
        </View>
      )}

      {/* Empty state */}
      {slots.length === 0 && !showPicker && (
        <View
          style={tw`bg-gray-50 border border-dashed border-gray-200 rounded-2xl py-5 items-center mb-3`}
        >
          <Text style={tw`text-sm text-gray-400`}>No time slots added yet</Text>
        </View>
      )}

      {/* Inline picker */}
      {showPicker && (
        <View style={tw`mb-3`}>
          <TimeRangePicker
            value={current}
            onChange={setCurrent}
            label=""
            showDuration
          />
          <View style={tw`flex-row gap-2 mt-2`}>
            <TouchableOpacity
              onPress={() => setShowPicker(false)}
              style={tw`flex-1 border border-gray-200 rounded-xl py-2.5 items-center`}
              activeOpacity={0.8}
            >
              <Text style={tw`text-sm font-medium text-gray-500`}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAdd}
              style={tw`flex-2 bg-indigo-600 rounded-xl py-2.5 px-6 items-center`}
              activeOpacity={0.85}
            >
              <Text style={tw`text-sm font-semibold text-white`}>Add Slot</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Add button */}
      {!showPicker && canAdd && (
        <TouchableOpacity
          onPress={() => setShowPicker(true)}
          activeOpacity={0.85}
          style={tw`flex-row items-center justify-center gap-2 bg-indigo-600 rounded-2xl py-2`}
        >
          <PlusIcon />
          <Text style={tw`text-white font-semibold text-sm`}>
            Add Time Slot
          </Text>
        </TouchableOpacity>
      )}

      {/* Max reached */}
      {maxSlots && slots.length >= maxSlots && (
        <Text style={tw`text-xs text-center text-gray-400 mt-2`}>
          Maximum {maxSlots} slots reached
        </Text>
      )}
    </View>
  );
}
