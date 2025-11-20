/* ======================== STEP 1 ======================== */

function Step1Name({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        Como você gostaria de ser chamado?
      </h1>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Digite seu nome"
        className="mt-4 w-full h-11 px-4 rounded-2xl border border-[#E5E7EB]"
      />
    </div>
  );
}

/* ======================== STEP 2 ======================== */

function Step2BirthDate({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        Qual sua data de nascimento?
      </h1>

      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-4 w-full h-11 px-4 rounded-2xl border border-[#E5E7EB]"
      />
    </div>
  );
}

/* ======================== STEP 3 ======================== */

function Step3FocusDifficulty({
  value,
  onChange,
}: {
  value: FocusDifficulty | null;
  onChange: (v: FocusDifficulty) => void;
}) {
  const options: FocusDifficulty[] = ['Sim', 'Às vezes', 'Quase sempre'];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        Você sente dificuldade de focar?
      </h1>

      <div className="grid gap-3 mt-4">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`w-full h-11 rounded-2xl border ${
              value === opt
                ? 'bg-[#111827] text-white'
                : 'bg-white border-[#E5E7EB]'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ======================== STEP 4 ======================== */

function Step4ImpulseCycles({
  value,
  onChange,
}: {
  value: ImpulseCycle[];
  onChange: (v: ImpulseCycle[]) => void;
}) {
  const options: ImpulseCycle[] = [
    'Redes sociais',
    'Celular o tempo todo',
    'Procrastinação',
    'Vídeos curtos',
    'Jogos / Pornografia',
  ];

  const toggle = (opt: ImpulseCycle) => {
    if (value.includes(opt)) {
      onChange(value.filter((item) => item !== opt));
    } else {
      onChange([...value, opt]);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        Quais impulsos mais te prendem?
      </h1>

      <div className="grid gap-3 mt-4">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => toggle(opt)}
            className={`w-full h-11 rounded-2xl border text-left px-4 ${
              value.includes(opt)
                ? 'bg-[#111827] text-white'
                : 'bg-white border-[#E5E7EB]'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <p className="text-xs text-[#6B7280]">Você pode escolher várias opções.</p>
    </div>
  );
}

/* ======================== STEP 5 ======================== */

function Step5OffPhoneTime({
  value,
  onChange,
}: {
  value: OffPhoneTime | null;
  onChange: (v: OffPhoneTime) => void;
}) {
  const options: OffPhoneTime[] = [
    '0–5 min',
    '5–15 min',
    '15–30 min',
    '+30 min',
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        Quanto tempo por dia você fica longe do celular?
      </h1>

      <div className="grid gap-3 mt-4">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`w-full h-11 rounded-2xl border ${
              value === opt
                ? 'bg-[#111827] text-white'
                : 'bg-white border-[#E5E7EB]'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ======================== STEP 6 ======================== */

function Step6MainGoal({
  value,
  onChange,
}: {
  value: MainGoal | null;
  onChange: (v: MainGoal) => void;
}) {
  const options: MainGoal[] = [
    'Focar mais',
    'Reduzir impulsos',
    'Melhorar disciplina',
    'Recomeçar',
  ];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        Qual seu objetivo principal?
      </h1>

      <div className="grid gap-3 mt-4">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`w-full h-11 rounded-2xl border ${
              value === opt
                ? 'bg-[#111827] text-white'
                : 'bg-white border-[#E5E7EB]'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
