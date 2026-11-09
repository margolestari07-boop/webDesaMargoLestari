const materialIconClass = "material-symbols-outlined";

export function ExpenseAllocationCard({ item }) {
  return (
    <div className="group bg-surface-container-lowest flex flex-col justify-between gap-5 rounded-3xl p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className={item.iconContainerClass}>
          <span className={`${materialIconClass} text-[26px]`}>
            {item.icon}
          </span>
        </div>
        <span
          className={`font-label-sm text-label-sm rounded-full px-3 py-1 ${item.badgeClass}`}
        >
          {item.badge}
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="font-headline-sm text-headline-sm text-on-surface">
          {item.title}
        </h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          {item.description}
        </p>
      </div>
      <div className="flex flex-col gap-2 pt-2">
        <div className="flex items-baseline justify-between">
          <span
            className={`font-headline-sm text-headline-sm font-bold ${item.amountColor}`}
          >
            {item.amount}
          </span>
          <span className="font-label-md text-label-md text-on-surface-variant font-bold">
            {item.percent}
          </span>
        </div>
        <div className="bg-surface-container-low h-2 w-full overflow-hidden rounded-full">
          <div
            className={`h-full rounded-full ${item.barColor}`}
            style={{ width: item.barWidth }}
          />
        </div>
        <div className="font-label-sm text-label-sm text-outline flex items-center justify-between pt-1">
          <span>{item.budget}</span>
          <span className="text-secondary font-bold">{item.achievement}</span>
        </div>
      </div>
    </div>
  );
}

export function RevenueSourceCard({ item }) {
  return (
    <div className="bg-surface-container-low relative flex flex-col gap-2 overflow-hidden rounded-2xl p-5">
      <div className={`absolute top-0 left-0 h-full w-2 ${item.accent}`} />
      <div className="flex items-center justify-between pl-2">
        <span className="font-label-md text-label-md text-on-surface font-bold">
          {item.title}
        </span>
        <span
          className={`font-label-md text-label-md font-extrabold ${item.percentColor}`}
        >
          {item.percent}
        </span>
      </div>
      <span className="font-headline-sm text-headline-sm text-on-surface pl-2 font-bold">
        {item.amount}
      </span>
      <p className="font-body-sm text-body-sm text-on-surface-variant pl-2">
        {item.description}
      </p>
    </div>
  );
}
