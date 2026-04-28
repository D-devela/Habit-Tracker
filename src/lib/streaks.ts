/* MENTOR_TRACE_STAGE3_HABIT_A91 */

export function calculateCurrentStreak(completions: string[], today?: string): number {
  if (!today) {
    today = new Date().toISOString().split('T')[0];
  }
  
  // Remove duplicates and sort
  const uniqueCompletions = [...new Set(completions)].sort();
  
  // Check if today is completed
  if (!uniqueCompletions.includes(today)) {
    return 0;
  }
  
  let streak = 1;
  let currentDate = new Date(today);
  
  for (let i = 1; i <= 365; i++) {
    currentDate.setDate(currentDate.getDate() - 1);
    const dateStr = currentDate.toISOString().split('T')[0];
    
    if (uniqueCompletions.includes(dateStr)) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}