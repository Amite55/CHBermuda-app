import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import tw from "twrnc";

// ── Types ──────────────────────────────────────────────────────────────────
export interface TimeState {
  hour: number; // 1–12
  minute: number; // 0–59
  ampm: "AM" | "PM";
}

export interface TimeRangeValue {
  start: TimeState;
  end: TimeState;
}

interface TimeRangePickerProps {
  value?: TimeRangeValue;
  onChange?: (value: TimeRangeValue) => void;
  label?: string;
  showDuration?: boolean;
}

// ── Helpers ────────────────────────────────────────────────────────────────
const pad = (n: number) => String(n).padStart(2, "0");

const fmt = (t: TimeState) => `${pad(t.hour)}:${pad(t.minute)} ${t.ampm}`;

const calcDuration = (start: TimeState, end: TimeState) => {
  const toMin = (t: TimeState) => {
    let h = t.hour % 12;
    if (t.ampm === "PM") h += 12;
    return h * 60 + t.minute;
  };
  let diff = toMin(end) - toMin(start);
  if (diff < 0) diff += 24 * 60;
  const hrs = Math.floor(diff / 60);
  const min = diff % 60;
  return `${hrs}h${min > 0 ? ` ${min}m` : ""}`;
};

const DEFAULT_VALUE: TimeRangeValue = {
  start: { hour: 9, minute: 0, ampm: "AM" },
  end: { hour: 5, minute: 0, ampm: "PM" },
};

// ── Sub-components ─────────────────────────────────────────────────────────
const EditIcon = () => (
  <Svg
    width={15}
    height={15}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#7C3AED"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M12 20h9" />
    <Path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
  </Svg>
);

const DrumColumn = ({
  value,
  onUp,
  onDown,
}: {
  value: string;
  onUp: () => void;
  onDown: () => void;
}) => (
  <View style={tw`items-center w-14`}>
    <TouchableOpacity onPress={onUp} style={tw`py-1 w-full items-center`}>
      <Text style={tw`text-lg text-gray-400`}>▲</Text>
    </TouchableOpacity>
    <View
      style={tw`bg-white border-2 border-indigo-400 rounded-xl w-full items-center py-2`}
    >
      <Text style={tw`text-3xl font-semibold text-gray-900`}>{value}</Text>
    </View>
    <TouchableOpacity onPress={onDown} style={tw`py-1 w-full items-center`}>
      <Text style={tw`text-lg text-gray-400`}>▼</Text>
    </TouchableOpacity>
  </View>
);

const DrumPicker = ({
  which,
  time,
  onChange,
  onConfirm,
}: {
  which: "start" | "end";
  time: TimeState;
  onChange: (t: TimeState) => void;
  onConfirm: () => void;
}) => {
  const adjustHour = (dir: 1 | -1) => {
    onChange({ ...time, hour: ((time.hour - 1 + dir + 12) % 12) + 1 });
  };
  const adjustMin = (dir: 1 | -1) => {
    onChange({ ...time, minute: (time.minute + dir * 5 + 60) % 60 });
  };

  return (
    <View style={tw`bg-gray-100 rounded-2xl p-4 mb-4`}>
      <View style={tw`flex-row items-center justify-center`}>
        <DrumColumn
          value={pad(time.hour)}
          onUp={() => adjustHour(1)}
          onDown={() => adjustHour(-1)}
        />
        <Text style={tw`text-2xl font-medium text-gray-400 mx-1 mb-1`}>:</Text>
        <DrumColumn
          value={pad(time.minute)}
          onUp={() => adjustMin(1)}
          onDown={() => adjustMin(-1)}
        />

        <View style={tw`ml-3 gap-1`}>
          {(["AM", "PM"] as const).map((val) => (
            <TouchableOpacity
              key={val}
              onPress={() => onChange({ ...time, ampm: val })}
              style={[
                tw`px-3 py-1.5 rounded-lg border`,
                time.ampm === val
                  ? tw`bg-indigo-500 border-indigo-500`
                  : tw`bg-white border-gray-200`,
              ]}
            >
              <Text
                style={[
                  tw`text-sm font-medium`,
                  time.ampm === val ? tw`text-white` : tw`text-gray-500`,
                ]}
              >
                {val}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        onPress={onConfirm}
        activeOpacity={0.85}
        style={tw`mt-4 bg-indigo-600 rounded-xl py-2.5 items-center`}
      >
        <Text style={tw`text-white font-semibold text-sm`}>
          Set {which === "start" ? "start" : "end"} time
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const TimeBlock = ({
  label,
  time,
  active,
  onPress,
}: {
  label: string;
  time: TimeState;
  active: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={[
      tw`flex-row items-center justify-between px-4 py-3.5 rounded-2xl mb-1`,
      active
        ? tw`bg-indigo-50 border-2 border-indigo-400`
        : tw`bg-gray-100 border-2 border-transparent`,
    ]}
  >
    <View>
      <Text style={tw`text-xs text-gray-400 font-medium mb-0.5`}>{label}</Text>
      <Text
        style={[
          tw`text-2xl font-semibold`,
          active ? tw`text-indigo-700` : tw`text-gray-900`,
        ]}
      >
        {fmt(time)}
      </Text>
    </View>
    <View
      style={tw`w-9 h-9 rounded-full bg-white border border-gray-200 items-center justify-center`}
    >
      <EditIcon />
    </View>
  </TouchableOpacity>
);

// ── Main Export ────────────────────────────────────────────────────────────
export default function TimeRangePicker({
  value,
  onChange,
  label = "Schedule Time",
  showDuration = true,
}: TimeRangePickerProps) {
  const [internalValue, setInternalValue] =
    useState<TimeRangeValue>(DEFAULT_VALUE);
  const [openPicker, setOpenPicker] = useState<"start" | "end" | null>(null);

  // Support both controlled and uncontrolled usage
  const current = value ?? internalValue;

  const update = (next: TimeRangeValue) => {
    setInternalValue(next);
    onChange?.(next);
  };

  const toggle = (which: "start" | "end") =>
    setOpenPicker((prev) => (prev === which ? null : which));

  return (
    <View style={tw`bg-white rounded-3xl p-5`}>
      {label ? (
        <Text
          style={tw`text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4`}
        >
          {label}
        </Text>
      ) : null}

      {/* Start */}
      <TimeBlock
        label="Start time"
        time={current.start}
        active={openPicker === "start"}
        onPress={() => toggle("start")}
      />
      {openPicker === "start" && (
        <DrumPicker
          which="start"
          time={current.start}
          onChange={(start) => update({ ...current, start })}
          onConfirm={() => setOpenPicker(null)}
        />
      )}

      {/* Divider */}
      <View style={tw`flex-row items-center gap-2 my-3`}>
        <View style={tw`flex-1 h-px bg-gray-200`} />
        <Text style={tw`text-xs text-gray-400`}>to</Text>
        <View style={tw`flex-1 h-px bg-gray-200`} />
      </View>

      {/* End */}
      <TimeBlock
        label="End time"
        time={current.end}
        active={openPicker === "end"}
        onPress={() => toggle("end")}
      />
      {openPicker === "end" && (
        <DrumPicker
          which="end"
          time={current.end}
          onChange={(end) => update({ ...current, end })}
          onConfirm={() => setOpenPicker(null)}
        />
      )}

      {/* Duration */}
      {showDuration && (
        <View style={tw`flex-row items-center gap-2 mt-4`}>
          <View style={tw`w-2 h-2 rounded-full bg-emerald-500`} />
          <Text style={tw`text-sm font-medium text-emerald-700`}>
            Duration: {calcDuration(current.start, current.end)}
          </Text>
        </View>
      )}
    </View>
  );
}
